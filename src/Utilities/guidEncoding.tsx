export const guidToShortenedGuid = (guid: string) => {
  return guid.replace(/-/g, "");
};

export const shortenedGuidToGuid = (string: string | undefined | null) => {
  if (string === undefined || string === null) return null;

  const regexExpression = /^[0-9a-fA-F]{32}$/gi;
  const isShortenedGuid = regexExpression.test(string);
  if (!isShortenedGuid) return null;

  const chunks = [];
  chunks.push(string.substring(0, 8));
  chunks.push(string.substring(8, 12));
  chunks.push(string.substring(12, 16));
  chunks.push(string.substring(16, 20));
  chunks.push(string.substring(20));
  return chunks.join("-");
};

export const checkIfGuid = (string: string) => {
  const regexExpression =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExpression.test(string);
};

export const checkIfShortenedGuid = (
  shortenedGuid: string | undefined | null
) => {
  if (shortenedGuid === undefined || shortenedGuid === null) return null;
  const regexExpression = /^[0-9a-fA-F]{32}$/gi;

  return regexExpression.test(shortenedGuid);
};

export const guidToBase64 = (guid: string) => {
  const shortenedGuid = guidToShortenedGuid(guid);

  const base64 = btoa(
    String.fromCharCode.apply(
      null,
      shortenedGuid
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(/ +$/, "")
        .split(" ")
        .map(Number)
    )
  );

  return base64.slice(0, -2).replace(/\+/g, "-").replace(/\//g, "_");
};

export const base64ToGuid = (shortenedBase64: string) => {
  const base64 = shortenedBase64.replace(/-/g, "+").replace(/_/g, "/") + "==";
  const hex = [];
  const bin = atob(base64.replace(/[ \r\n]+$/, ""));

  for (let i = 0; i < bin.length; ++i) {
    let tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = "0" + tmp;
    hex[hex.length] = tmp;
  }

  const shortenedGuid = hex.join("");

  return shortenedGuidToGuid(shortenedGuid);
};
