import Layout from "../layout/layout";
import Head from "next/head";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const onSubmit = async (values: any) => {
    const status: any = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
    if (status?.ok) {
      router.push(`/${session?.user?.id}`);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="mx-auto flex w-3/4 flex-col gap-10">
        <div className="title">
          <h1 className="py-4 text-4xl font-bold text-gray-800">Explore</h1>
          <p className="mx-auto w-3/4 text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipsicing elit. Dolorers,
            officia?
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="email"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="input-button">
            <button type="submit">Login</button>
          </div>
          <div className="input-button">
            <button type="submit" onClick={handleGoogleSignIn}>
              Sign In with Google
            </button>
          </div>
          <div className="input-button">
            <button type="submit">Sign In with GitHub</button>
          </div>
        </form>
        <p className="text-gray text-center">
          Do not have an account?{" "}
          <Link href={"/register"} className="text-blue-400">
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Login;
