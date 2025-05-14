"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "خطا",
        description: "لطفاً همه فیلدها را پر کنید",
        variant: "destructive",
      })
      return
    }

    if (!acceptTerms) {
      toast({
        title: "خطا",
        description: "شما باید شرایط و ضوابط را بپذیرید",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // This is a placeholder for future registration logic
      // For now, we'll just simulate a registration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "موفقیت",
        description: "حساب شما با موفقیت ایجاد شد",
      })

      router.push("/login")
    } catch (error) {
      toast({
        title: "خطا",
        description: "ایجاد حساب ناموفق بود. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">ایجاد حساب کاربری</h1>
        <p className="text-muted-foreground">به پلنتیو بپیوندید و سفر گیاهی خود را آغاز کنید</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">نام کامل</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="علی رضایی"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">ایمیل</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="شما@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">رمز عبور</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">رمز عبور باید حداقل ۸ کاراکتر باشد</p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(checked) => setAcceptTerms(checked === true)} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            من با{" "}
            <Link href="/terms" className="text-primary hover:underline">
              شرایط و ضوابط
            </Link>
            موافقم
          </label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              در حال ایجاد حساب...
            </>
          ) : (
            "ایجاد حساب"
          )}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">یا ادامه با</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" disabled={isLoading}>
            گوگل
          </Button>
          <Button variant="outline" type="button" disabled={isLoading}>
            فیسبوک
          </Button>
        </div>
      </div>

      <p className="text-center mt-8 text-sm text-muted-foreground">
        قبلاً حساب دارید؟{" "}
        <Link href="/login" className="text-primary hover:underline">
          وارد شوید
        </Link>
      </p>
    </div>
  )
}
