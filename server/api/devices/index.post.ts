import { handleError, prisma } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const { name, apiKey } = await readBody<Device>(event);

    const schema = z.object({
      name: z.string().min(1),
      apiKey: z.string().min(1),
    });

    schema.parse({ name, apiKey });

    const device = await prisma.device.create({
      data: {
        name,
        userId,
        apiKey,
      },
    });

    return device;
  } catch (error) {
    await handleError(error);
  }
});
