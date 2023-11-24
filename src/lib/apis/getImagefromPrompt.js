const getImagefromPrompt = async (prompt, text, signal) => {
  if (text.trim().length !== 0) {
    prompt=prompt + " Add speech bubble with " + text;
  }
  const response = await fetch(
    "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
    {
      headers: {
        Accept: "image/png",
        Authorization:
          "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
      signal,
    }
  );
  const blob = await response.blob();

  return blob;
};

export default getImagefromPrompt;
