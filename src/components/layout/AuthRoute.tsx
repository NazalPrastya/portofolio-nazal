import { useRouter } from "next/router";
import { type PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "~/lib/supabase/client";
import Loader from "../loader";

export const AuthRoute = (props: PropsWithChildren) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async function () {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        await router.replace("/");
      } else {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <>{props.children}</>;
};
