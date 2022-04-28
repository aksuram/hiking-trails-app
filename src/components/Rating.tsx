import { IconButton, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDownOutlined";
import { useContext, useState } from "react";
import { API_URL } from "../utils/Config";
import { HTTPMethod, Response, sleep } from "../utils/Random";
import { UserContext } from "./UserContext";
import { green, lightGreen, red } from "@mui/material/colors";

export enum RatingType {
  Post,
  Comment,
}

export interface Rating {
  id: string;
  isPositive: boolean;
}

interface RatingState {
  userRating: Rating | null;
  parentRating: number;
}

interface PartialProps {
  parentId: string;
  ratingType: RatingType;
}

interface FetchOptions {
  httpMethod: HTTPMethod;
  payload?: BodyInit | null;
}

type Props = RatingState & PartialProps;

const RatingElement = ({
  userRating,
  parentRating,
  parentId,
  ratingType,
}: Props) => {
  const [ratingState, setRatingState] = useState<RatingState>({
    userRating: userRating,
    parentRating: parentRating,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userInfo } = useContext(UserContext);

  //TODO: Show rating fetch errors in toast messages?
  const ratingFetch = async (
    fetchOptions: FetchOptions
  ): Promise<Response<Rating | null>> => {
    const ratingId: string | null =
      ratingState.userRating != null &&
      (fetchOptions.httpMethod === HTTPMethod.DELETE ||
        fetchOptions.httpMethod === HTTPMethod.PATCH)
        ? ratingState.userRating?.id
        : null;

    const endpointUrl = `${API_URL}rating/${ratingId ?? ""}`;

    try {
      const response = await fetch(endpointUrl, {
        method: fetchOptions.httpMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
        body: fetchOptions.payload,
      });
      await sleep(200);

      if (response.status === 200 || response.status === 201) {
        return {
          isSuccess: true,
          data: (await response.json()) as Rating,
        } as Response<Rating | null>;
      }

      if (response.status === 204) {
        return {
          isSuccess: true,
          data: null,
        } as Response<Rating | null>;
      }

      //TODO: Show error in toast message?
    } catch (error) {
      //TODO: Show error in toast message?
    }

    return {
      isSuccess: false,
      data: null,
    } as Response<Rating | null>;
  };

  //TODO: HandleLikeClick and HandleDislikeClick can be combined into one method
  const handleLikeClick = async () => {
    setIsLoading(true);

    if (ratingState.userRating === null) {
      await ratingFetch({
        httpMethod: HTTPMethod.POST,
        payload: JSON.stringify({
          isPositive: true,
          postId: ratingType === RatingType.Post ? parentId : null,
          commentId: ratingType === RatingType.Comment ? parentId : null,
        }),
      }).then(({ isSuccess, data: newUserRating }) => {
        if (!isSuccess) return;
        setRatingState((currentRatingState) => {
          return {
            userRating: newUserRating,
            parentRating: currentRatingState.parentRating + 1,
          };
        });
      });
      setIsLoading(false);
      return;
    }

    if (ratingState.userRating.isPositive === false) {
      await ratingFetch({
        httpMethod: HTTPMethod.PATCH,
        payload: JSON.stringify({
          isPositive: true,
        }),
      }).then(({ isSuccess, data: updatedUserRating }) => {
        if (!isSuccess) return;
        setRatingState((currentRatingState) => {
          return {
            userRating: updatedUserRating,
            parentRating: currentRatingState.parentRating + 2,
          };
        });
      });
      setIsLoading(false);
      return;
    }

    //if (ratingState.userRating.isPositive === true)
    await ratingFetch({
      httpMethod: HTTPMethod.DELETE,
    }).then(({ isSuccess, data: nullUserRating }) => {
      if (!isSuccess) return;
      setRatingState((currentRatingState) => {
        return {
          userRating: nullUserRating,
          parentRating: currentRatingState.parentRating - 1,
        };
      });
    });
    setIsLoading(false);
  };

  const handleDislikeClick = async () => {
    setIsLoading(true);

    if (ratingState.userRating === null) {
      await ratingFetch({
        httpMethod: HTTPMethod.POST,
        payload: JSON.stringify({
          isPositive: false,
          postId: ratingType === RatingType.Post ? parentId : null,
          commentId: ratingType === RatingType.Comment ? parentId : null,
        }),
      }).then(({ isSuccess, data: newUserRating }) => {
        if (!isSuccess) return;
        setRatingState((currentRatingState) => {
          return {
            userRating: newUserRating,
            parentRating: currentRatingState.parentRating - 1,
          };
        });
      });
      setIsLoading(false);
      return;
    }

    if (ratingState.userRating.isPositive === true) {
      await ratingFetch({
        httpMethod: HTTPMethod.PATCH,
        payload: JSON.stringify({
          isPositive: false,
        }),
      }).then(({ isSuccess, data: updatedUserRating }) => {
        if (!isSuccess) return;
        setRatingState((currentRatingState) => {
          return {
            userRating: updatedUserRating,
            parentRating: currentRatingState.parentRating - 2,
          };
        });
      });
      setIsLoading(false);
      return;
    }

    //if (ratingState.userRating.isPositive === false)
    await ratingFetch({
      httpMethod: HTTPMethod.DELETE,
    }).then(({ isSuccess, data: nullUserRating }) => {
      if (!isSuccess) return;
      setRatingState((currentRatingState) => {
        return {
          userRating: nullUserRating,
          parentRating: currentRatingState.parentRating + 1,
        };
      });
    });
    setIsLoading(false);
  };

  return (
    <>
      <IconButton
        disabled={userInfo === null || isLoading}
        onClick={handleLikeClick}
        aria-label="like"
        size="small"
        color={
          ratingState.userRating != null && ratingState.userRating.isPositive
            ? "success"
            : undefined
        }
      >
        <ThumbUpIcon
          fontSize={ratingType === RatingType.Post ? "medium" : "small"}
        />
      </IconButton>

      <IconButton
        disabled={userInfo === null || isLoading}
        onClick={handleDislikeClick}
        aria-label="dislike"
        size="small"
        color={
          ratingState.userRating != null && !ratingState.userRating.isPositive
            ? "error"
            : undefined
        }
      >
        <ThumbDownIcon
          fontSize={ratingType === RatingType.Post ? "medium" : "small"}
        />
      </IconButton>

      <Typography
        variant="button" //TODO: Change color
        color={ratingState.parentRating < 0 ? "#ed7676" : lightGreen[700]}
        sx={{
          ml: ratingType === RatingType.Post ? 1 : 0.8,
          placeSelf: "center",
          fontSize: ratingType === RatingType.Post ? 18 : 16,
        }}
      >
        {ratingState.parentRating}
      </Typography>
    </>
  );
};

export default RatingElement;
