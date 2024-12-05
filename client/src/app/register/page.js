"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Phone, Lock, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const phoneRegExp = /^[0-9]{10}$/;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(["admin", "student", "teacher"], "Invalid role")
    .required("Role is required"),
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  fatherName: Yup.string()
    .min(2, "Father's name must be at least 2 characters")
    .required("Father's name is required"),
  motherName: Yup.string()
    .min(2, "Mother's name must be at least 2 characters")
    .required("Mother's name is required"),
});

export default function RegisterPage() {
  const { toast } = useToast()
  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      fullName: "",
      fatherName: "",
      motherName: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('http://localhost:8000/register', values)
        if (data) {
          toast({
            title: data.msg
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: error?.response?.data?.msg
        })
      }
    },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4 mb-12">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Sikshyalaya Logo"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">SIKSHYALAYA</h1>
            <p className="text-lg text-gray-400">Smart Schooling Solution</p>
          </div>

          <div className="max-w-2xl mx-auto backdrop-blur-sm bg-white/10 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.07)] p-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-center mb-8">Create Your Account</h2>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                      {...formik.getFieldProps("fullName")}
                    />
                  </div>
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-sm text-red-400">{formik.errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-400">{formik.errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="1234567890"
                      className="pl-10 bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                      {...formik.getFieldProps("phoneNumber")}
                    />
                  </div>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="text-sm text-red-400">{formik.errors.phoneNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                      {...formik.getFieldProps("password")}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-red-400">{formik.errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fatherName" className="text-white">Father's Name</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="fatherName"
                      name="fatherName"
                      type="text"
                      placeholder="Father's Name"
                      className="pl-10 bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                      {...formik.getFieldProps("fatherName")}
                    />
                  </div>
                  {formik.touched.fatherName && formik.errors.fatherName && (
                    <p className="text-sm text-red-400">{formik.errors.fatherName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motherName" className="text-white">Mother's Name</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="motherName"
                      name="motherName"
                      type="text"
                      placeholder="Mother's Name"
                      className="pl-10 bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                      {...formik.getFieldProps("motherName")}
                    />
                  </div>
                  {formik.touched.motherName && formik.errors.motherName && (
                    <p className="text-sm text-red-400">{formik.errors.motherName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-white">Role</Label>
                  <Select
                    name="role"
                    onValueChange={(value) =>
                      formik.setFieldValue("role", value, true)
                    }
                  >
                    <SelectTrigger className="bg-black/50 border-white/20 text-white">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white border-white/20">
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      
                    </SelectContent>
                  </Select>
                  {formik.touched.role && formik.errors.role && (
                    <p className="text-sm text-red-400">{formik.errors.role}</p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-white/90 transition-all duration-200"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}