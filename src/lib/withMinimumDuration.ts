export const withMinimumDuration = async <T>(
  action: Promise<T>,
  minimumMs = 400,
): Promise<T> => {
  const delay = new Promise<void>((resolve) => setTimeout(resolve, minimumMs));
  const [result] = await Promise.all([action, delay]);

  return result;
};
