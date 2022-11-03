import Head from "next/head";
import Link from "next/link";
import Layout from "../layout/layout";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      cpassword: "",
    },
    onSubmit,
  });

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <section className="mx-auto flex w-3/4 flex-col gap-10">
        <div className="title">
          <h1 className="py-4 text-4xl font-bold text-gray-800">Register</h1>
          <p className="mx-auto w-3/4 text-gray-400">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipsicing elit. Dolorers,
            officia?
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <input
              type="name"
              name="name"
              placeholder="name"
              {...formik.getFieldProps("name")}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
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
              name="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="input-group">
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              {...formik.getFieldProps("cpassword")}
            />
            {formik.errors.cpassword && formik.touched.cpassword ? (
              <div className="text-red-500">{formik.errors.cpassword}</div>
            ) : null}
          </div>
          <div className="input-button">
            <button type="submit">Register</button>
          </div>
        </form>
        <p className="text-gray text-center">
          Have an account?{" "}
          <Link href={"/login"} className="text-blue-400">
            Sign In
          </Link>
        </p>
      </section>
    </Layout>
  );
};
