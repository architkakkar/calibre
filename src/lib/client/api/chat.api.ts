import apiClient from "@/lib/client/api-client";
import API_ROUTES from "@/lib/client/api-routes";

export async function fetchChatsApi() {
  const response = await apiClient.get(API_ROUTES.chat.history);

  return response.data;
}

export async function fetchChatByIdApi(chatId: string) {
  const url = API_ROUTES.chat.byId.replace("{chatId}", chatId);
  const response = await apiClient.get(url);

  return response.data;
}

export async function deleteChatApi(chatId: string) {
  const url = API_ROUTES.chat.byId.replace("{chatId}", chatId);
  const response = await apiClient.delete(url);

  return response.data;
}
