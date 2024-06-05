"use client"

import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewPasswordSchema } from '@/../schemas'


import {
    Card,
    CardHeader,
    CardFooter,
    CardDescription,
    CardTitle,
    CardContent
} from '@/../components/ui/card'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage

} from '@/../components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import BackButton from './back-button'
import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/../action/auth/new-password'
import FormError from '../global/form-error'
import FormSuccess from '../global/form-success'

const NewPasswordForm = () => {

    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    
    const [error , setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ''
        }
    })



    const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            newPassword(data, token)
                .then((response) => {
                    if(response.error){
                        form.reset()
                        setError(response.error)
                    }

                    if (response.success){
                        form.reset()
                        setSuccess(response.success)
                    }
                })
                .catch(() => setError("An error occurred"))
        })
    }


    return (
        <Card>  

            <CardHeader>
                <CardTitle className='text-2xl'>Enter a new password</CardTitle>
                <CardDescription>Enter your new password to change your password</CardDescription>

            </CardHeader>

            <CardContent className='space-y-4'>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <FormField 
                            name='password'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type='password'
                                            disabled={isPending}
                                            placeholder='Enter your new password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            type='submit'
                            disabled={isPending}
                            className='w-full'

                        >
                            Reset password
                        </Button>

                    </form>
                </Form>

            </CardContent>

            <CardFooter>
                <BackButton href={'/auth/sign-in'} label={'Back to Login'} />
            </CardFooter>
        </Card>
    )
}

export default NewPasswordForm