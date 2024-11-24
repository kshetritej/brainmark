import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

export function LoginForm() {
    const handleLogin = useMutation({
        mutationKey: ['login'],
        mutationFn: async (data: any) => {
            const res = await axios.post('http://localhost:3000/user/login', data)
            return res.data
        },
        onSuccess: (response) => {
            toast({
                title: response.message,
                variant: 'default',
            })
            localStorage.setItem('token', response.token)
        }

    })
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const handleForm = (data: any) => {
        handleLogin.mutate(data)
    }
    return (
        <div className="flex justify-center mx-auto  items-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4" onSubmit={handleSubmit(handleForm)}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                {...register("email")}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="pass        const { register, handleSubmit } = useForm({
            defaultValues: {
                email: '',
                password: ''
            }
        })word">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" {...register("password")} type="password" required />

                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/auth" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
