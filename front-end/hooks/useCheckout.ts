import { useState } from "react"
import { api } from "@/lib/request"

interface AssinaturaRequest {
  usuarioId: string | null
  dias: string[]
  valorSemanal: number
  dataInicio: string
  dataFim: string
}

interface CheckoutResponse {
  url: string
}

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const criarCheckout = async (dados: AssinaturaRequest): Promise<string | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem("token")

      const response = await api.post<CheckoutResponse>("/plano/criar-checkout", dados, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.url
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
      setError(errorMessage)
      console.error("Erro ao processar checkout:", errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { criarCheckout, isLoading, error }
}
