import { API_URL } from "./client";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/uploads`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Не вдалося завантажити фото.");
  }

  const { url } = (await res.json()) as { url: string };
  return `${API_URL}${url}`;
}
