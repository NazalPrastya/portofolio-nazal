import { useEffect, useState } from "react";

export default function NoSSR({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : null;
}
