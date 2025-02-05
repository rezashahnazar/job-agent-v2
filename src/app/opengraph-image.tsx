import { createOpenGraphImage } from "@/lib/opengraph";
import { Logo } from "@/components/brand/logo";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";
export const alt = "Job.Shahnazar.Me";

export default async function Image() {
  return createOpenGraphImage({
    logo: <Logo size={80} />,
    title: "Job.Shahnazar.Me",
    line1: "دستیار هوشمند جذب همکار",
    line2: "ارسال رزومه و بررسی با هوش مصنوعی",
  });
}
