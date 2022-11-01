import {
  Box,
  Flex,
  FormControl,
  Button,
  Input,
  FormErrorMessage,
  Heading,
  VStack,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

import { FC, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
// import NextImage from "next/image";
// import { useSWRConfig } from "swr";
import { auth } from "../helpers/mutations";

type initValsTypes = {
  name?: string;
  email: string;
  password: string;
};

const AuthenticationForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const initialValues: initValsTypes =
    mode === "signin"
      ? { email: "", password: "" }
      : { name: "", password: "", email: "" };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  return (
    <Flex
      height="100vh"
      width="100vw"
      align="center"
      justify="center"
      direction="column"
      bg="blackAlpha.800"
    >
      <Box bg="gray.900" py={10} px={5} rounded={6}>
        <Heading mb={5}>{mode === "signin" ? "Login" : "Register"} </Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   actions.setSubmitting(false);
            // }, 1000);
            setIsLoading(true);
            await auth(mode, values);
            setIsLoading(false);
            router.push("/");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <VStack minH={250} align="center" justify="space-around">
                <VStack spacing={4}>
                  {mode === "signup" ? (
                    <FormControl
                      isInvalid={!!errors.name && touched.name}
                      isRequired={true}
                    >
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        variant="filled"
                        placeholder="Rami"
                        validate={(value) => {
                          return !value ? "Cannot be blank" : "";
                        }}
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                  ) : null}
                  <FormControl
                    isInvalid={!!errors.email && touched.email}
                    isRequired={true}
                  >
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      variant="filled"
                      placeholder="xyz@mail.com"
                      validate={(value) => {
                        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
                        if (!value) {
                          return (errors.email = "Cannot be blank");
                        } else if (!regex.test(value)) {
                          return "Invalid email format";
                        }
                      }}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                    isRequired={true}
                  >
                    <InputGroup>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={show ? "text" : "password"}
                        variant="filled"
                        placeholder="password"
                        validate={(value) => {
                          return value?.length < 6
                            ? "Password should be over 6 characters"
                            : "";
                        }}
                      />
                      <InputRightElement
                        m="auto 10px"
                        w="1.5rem"
                        cursor="pointer"
                        children={show ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                        onClick={() => {
                          setShow((prev) => !prev);
                        }}
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                </VStack>
                <Button
                  w="full"
                  colorScheme="teal"
                  type="submit"
                  isLoading={isLoading}
                >
                  {mode === "signin" ? "Login" : "Register"}
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
export default AuthenticationForm;
