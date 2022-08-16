export const sleepAtLeast = async <T,>(
  ms: number,
  func: () => Promise<T>
): Promise<T> => {
  const startTime = new Date().getTime();

  const funcReturn = await func();

  const timeDifference = ms - (new Date().getTime() - startTime);
  if (timeDifference > 0) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  return funcReturn;
};
