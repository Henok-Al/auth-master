"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";

import {
  Card,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BackButton from "./back-button";

const NewPasswordForm = () => {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    console.log(data);
  };

  const isLoading = form.formState.isSubmitting;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Enter a new password</CardTitle>
        <CardDescription>
          Enter your new password to change your password
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isLoading}
                      placeholder="enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
               Reset password
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <BackButton href={"/auth/sign-in"} label={"Back to Login"} />
      </CardFooter>
    </Card>
  );
};

export default NewPasswordForm;
