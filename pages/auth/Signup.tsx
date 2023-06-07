import { FC, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  HelperText,
  List,
  Snackbar,
  Surface,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import PageContainer from "../../components/PageContainer";

import * as NavigationService from "react-navigation-helpers";
import { useSupabase } from "../../providers/supabase-provider";
import { View } from "react-native";
import { AuthError } from "@supabase/supabase-js";

interface SignupProps {}

const Signup: FC<SignupProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [authError, setAuthError] = useState<AuthError | null>(null);

  const { supabase } = useSupabase();

  const emailHasErrors = () => {
    return !email.includes("@");
  };
  const passwordHasErrors = () => {
    return password.length < 8;
  };

  const handleSignup = async () => {
    if (emailHasErrors() || passwordHasErrors()) {
      //   setAuthError();
    }
    setIsPending(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log({ data, error });
    if (error) {
      setAuthError(error);
    } else if (data) {
      setSignedUp(true);
      // NavigationService.navigate("Login");
    }

    setIsPending(false);
  };

  return (
    <PageContainer>
      <Surface
        elevation={0}
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text variant="headlineLarge">Create an account</Text>
        <Text variant="titleSmall">Let{"'"}s get you one more brain</Text>
        <Divider style={{ marginBottom: 32 }} />
        <List.Section>
          <TextInput
            left={<TextInput.Icon size={24} icon="email" />}
            label="Email"
            value={email}
            keyboardType="email-address"
            placeholder="abc@xyz.com"
            onChangeText={(text) => setEmail(text)}
          />
          <HelperText type="info" visible={emailHasErrors()}>
            Email address is invalid
          </HelperText>
          <TextInput
            left={<TextInput.Icon icon={"form-textbox-password"} />}
            label="Password"
            value={password}
            placeholder="Enter your password"
            secureTextEntry={!passwordVisible}
            onChangeText={(password) => setPassword(password)}
          />
          <HelperText type="info" visible={passwordHasErrors()}>
            Passoword must contain atleast 8 characters
          </HelperText>
          <TouchableRipple
            style={{ alignSelf: "flex-start", paddingRight: 16 }}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox status={passwordVisible ? "checked" : "unchecked"} />
              <Text style={{ display: "flex" }}>Show password</Text>
            </View>
          </TouchableRipple>
          <Button
            style={{ marginTop: 16, width: 128, alignSelf: "center" }}
            mode="contained"
            loading={isPending}
            onPress={async () => {
              await handleSignup();
            }}
          >
            Sign Up
          </Button>
          <Button onPress={() => NavigationService.navigate("Login")}>
            Already have an account? Sign In
          </Button>
        </List.Section>
      </Surface>
      <Snackbar
        visible={signedUp}
        onDismiss={() => {
          setSignedUp(false);
          NavigationService.navigate("Login");
        }}
        action={{
          label: "Login",
          onPress: () => {
            setSignedUp(false);
            NavigationService.navigate("Login");
          },
        }}
      >
        {`Sign Up Success. Check your email for further instructions.`}
      </Snackbar>
      <Snackbar
        visible={authError !== null}
        onDismiss={() => setAuthError(null)}
      >
        {`${authError?.message}`}
      </Snackbar>
    </PageContainer>
  );
};

export default Signup;
