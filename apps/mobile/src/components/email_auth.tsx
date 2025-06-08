import { useRouter } from "expo-router";
import { Button } from "~/components/Button";

export function EmailAuthButton() {
  const router = useRouter();

  return (
    <Button disabled={true} fullWidth={true} onPress={() => router.push("/auth/email")}>
        Authentification par Email
    </Button>
  );
}
