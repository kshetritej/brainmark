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
import { toast } from "@/hooks/use-toast"
import { useRegister } from "@/queries/auth.query"

export function RegisterForm() {
    const handleRegister = useRegister();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const handleForm = (data: any) => {
        if (data.password !== data.confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            })
            return;
        }
        handleRegister.mutate(data)
    }

    return (
        <div className="flex justify-center mx-auto items-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Create an account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4" onSubmit={handleSubmit(handleForm)}>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                {...register("username")}
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                required
                            />
                        </div>
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
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                {...register("password")}
                                type="password"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                {...register("confirmPassword")}
                                type="password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                        <Button variant="outline" className="w-full">
                            Register with Google
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="underline">
                            Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

