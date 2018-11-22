import ApiServices from "../ApiServices";

const getAllConversation = async userId => {
  try {
    const url = `conversation/${userId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const getMessages = async conversationId => {
  try {
    const url = `conversation/message/${conversationId}`;
    const data = await ApiServices.get(url);
    return data.result;
  } catch (error) {
    throw error;
  }
};

const addMessage = async message => {
  try {
    const url = `conversation/message/add`;
    const method = "POST";
    const data = await ApiServices.requestOption(method, url, message);
    return data.result;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllConversation,
  getMessages,
  addMessage
};
