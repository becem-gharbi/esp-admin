import { handleError, prisma } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    checkUser(event);

    const id = event.context.params?.id;

    const schema = z.object({
      id: z.string().regex(/^[a-fA-F0-9]{24}$/),
    });

    schema.parse({ id });

    const deployment = await prisma.deployment.findUnique({
      where: {
        id,
      },
      include: {
        release: {
          select: {
            version: true,
            projectId: true,
          },
        },
      },
    });

    return deployment;
  } catch (error) {
    await handleError(error);
  }
});
