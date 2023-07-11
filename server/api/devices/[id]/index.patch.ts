import { handleError, prisma } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    checkUser(event);

    const id = event.context.params?.id;
    const data = await readBody<Partial<Device>>(event);

    const schema = z.object({
      id: z.string().regex(/^[a-fA-F0-9]{24}$/),
    });

    schema.parse({ id });

    const device = await prisma.device.update({
      where: {
        id,
      },
      data,
    });

    return device;
  } catch (error) {
    await handleError(error);
  }
});
