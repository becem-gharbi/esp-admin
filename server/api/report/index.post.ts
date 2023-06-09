import { handleError, prisma } from "#auth";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const { webhookEnable, emailEnable, emailAddress, webhookUrl } =
      await readBody<Report>(event);

    const schema = z.object({
      webhookEnable: z.boolean(),
      emailEnable: z.boolean(),
      webhookUrl: z.string().url(),
      emailAddress: z.string().email(),
    });

    schema.parse({ webhookEnable, emailEnable, webhookUrl, emailAddress });

    const report = await prisma.report.create({
      data: {
        webhookEnable,
        webhookUrl,
        emailAddress,
        emailEnable,
        userId,
      },
    });

    return report;
  } catch (error) {
    await handleError(error);
  }
});
