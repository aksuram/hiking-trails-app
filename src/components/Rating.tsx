import { IconButton, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDownOutlined";
import { useState } from "react";
import { API_URL } from "../utils/Config";
import { HTTPMethod } from "../utils/Random";

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
  postRating: number;
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
  postRating,
  parentId,
  ratingType,
}: Props) => {
  const [ratingState, setRatingState] = useState<RatingState>({
    userRating: userRating,
    postRating: postRating,
  });

  //TODO: Disallow pressing rating buttons while fetch hasn't returned a response?
  const ratingFetch = async (
    fetchOptions: FetchOptions
  ): Promise<Rating | null> => {
    const ratingId: string | null =
      userRating != null &&
      (fetchOptions.httpMethod === HTTPMethod.DELETE ||
        fetchOptions.httpMethod === HTTPMethod.PATCH)
        ? userRating?.id
        : null;

    const endpointUrl = `${API_URL}rating/${ratingId ?? ""}`;

    try {
      const response = await fetch(endpointUrl, {
        method: fetchOptions.httpMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: fetchOptions.payload,
      });

      if (!response.ok) {
        console.log("TODO: NEPAVYKO ĮVYKDYTI ĮVERTINIMO UŽKLAUSOS");
        return null;
      }

      if (response.status === 200 || response.status === 201) {
        return (await response.json()) as Rating;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  //TODO: HandleLikeClick and HandleDislikeClick can be combined into one method
  const handleLikeClick = () => {
    if (ratingState.userRating === null) {
      //TODO: Create like
      ratingFetch({
        httpMethod: HTTPMethod.POST,
        payload: JSON.stringify({
          isPositive: true,
          postId: ratingType === RatingType.Post ? parentId : null,
          commentId: ratingType === RatingType.Comment ? parentId : null,
        }),
      }).then((newUserRating) => {
        setRatingState((currentRatingState) => {
          return {
            userRating: newUserRating,
            postRating: currentRatingState.postRating + 1,
          };
        });
      });
      return;
    }

    if (ratingState.userRating.isPositive === false) {
      //TODO: Update rating to like
      ratingFetch({
        httpMethod: HTTPMethod.PATCH,
        payload: JSON.stringify({
          isPositive: true,
        }),
      }).then((updatedUserRating) => {
        setRatingState((currentRatingState) => {
          return {
            userRating: updatedUserRating,
            postRating: currentRatingState.postRating + 2,
          };
        });
      });

      return;
    }

    //x.userRating === true
    //TODO: Delete like
    ratingFetch({
      httpMethod: HTTPMethod.DELETE,
    }).then((nullUserRating) => {
      setRatingState((currentRatingState) => {
        return {
          userRating: nullUserRating,
          postRating: currentRatingState.postRating - 1,
        };
      });
    });
  };

  // const handleLikeClick = () => {
  //   setRatingState((x) => {
  //     if (x.userRating === null) {
  //       //TODO: Create like
  //       await ratingFetch({
  //         httpMethod: HTTPMethod.POST,
  //         payload: JSON.stringify({
  //           isPositive: true,
  //           postId: ratingType === RatingType.Post ? parentId : null,
  //           commentId: ratingType === RatingType.Comment ? parentId : null,
  //         }),
  //       });

  //       return {
  //         userRating: {
  //           isPositive: true,
  //           id: "TODO: SET ID FROM CREATED LIKE",
  //         },
  //         postRating: x.postRating + 1,
  //       };
  //     }
  //     if (x.userRating.isPositive === false) {
  //       //TODO: Update rating to like
  //       return {
  //         userRating: {
  //           isPositive: true,
  //           id: x.userRating.id,
  //         },
  //         postRating: x.postRating + 2,
  //       };
  //     }
  //     //x.userRating === true
  //     //TODO: Delete like
  //     return {
  //       userRating: null,
  //       postRating: x.postRating - 1,
  //     };
  //   });
  // };

  const handleDislikeClick = () => {
    setRatingState((x) => {
      if (x.userRating === null) {
        //TODO: Create dislike
        return {
          userRating: {
            isPositive: false,
            id: "TODO: SET ID FROM CREATED LIKE",
          },
          postRating: x.postRating - 1,
        };
      }
      if (x.userRating.isPositive === true) {
        //TODO: Update rating to dislike
        return {
          userRating: {
            isPositive: false,
            id: x.userRating.id,
          },
          postRating: x.postRating - 2,
        };
      }
      //x.userRating === false
      //TODO: Delete dislike
      return {
        userRating: null,
        postRating: x.postRating + 1,
      };
    });
  };

  return (
    <>
      <IconButton
        onClick={handleLikeClick}
        aria-label="like"
        size="small"
        color={ratingState.userRating?.isPositive ? "success" : undefined}
      >
        <ThumbUpIcon fontSize="medium" />
      </IconButton>

      <IconButton
        onClick={handleDislikeClick}
        aria-label="dislike"
        size="small"
        color={
          ratingState.userRating != null && !ratingState.userRating.isPositive
            ? "error"
            : undefined
        }
      >
        <ThumbDownIcon fontSize="medium" />
      </IconButton>

      <Typography
        variant="button"
        color="green"
        sx={{ ml: 1, placeSelf: "center", fontSize: 18 }}
      >
        {ratingState.postRating}
      </Typography>
    </>
  );
};

export default RatingElement;
