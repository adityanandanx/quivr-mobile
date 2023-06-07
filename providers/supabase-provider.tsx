import "react-native-url-polyfill/auto";
import { Session, SupabaseClient, createClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: SupabaseClient;
  session: MaybeSession;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(process.env);

  const [supabase] = useState(() =>
    createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {})
  );
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      console.log("AUTH CHANGE");
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};
