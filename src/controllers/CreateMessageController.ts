import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

import { io } from "../server";

class CreateMessageController {
  async handle(request: Request, response: Response) {
    const {
      text
    } = request.body;

    const {
      user_id
    } = request;

    const service = new CreateMessageService();

    const message = await service.execute(text, user_id);

    return response.status(201).json(message);
  }
}

export { CreateMessageController };