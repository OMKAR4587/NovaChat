const API_URL = "http://localhost:5000/api/chat";

export async function sendChatMessage(messages) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
    }),
  });

  const contentType = response.headers.get("content-type");

  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();

    throw new Error(
      text || "Server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.error || "Something went wrong. Please try again."
    );
  }

  return data;
}