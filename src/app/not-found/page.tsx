import NotFoundContent from "@/components/not-found-content";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <Suspense fallback={null}>
      <NotFoundContent />
    </Suspense>
  );
}