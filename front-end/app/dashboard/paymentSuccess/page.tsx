"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Receipt } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  const baixarRecibo = () => {
    const conteudo = `
RECIBO DE PAGAMENTO
----------------------------

Status: Aprovado
Método: Cartão de Crédito
Data: ${new Date().toLocaleDateString("pt-BR")}

Plano: Assinatura Ativa

Obrigado por utilizar nossa plataforma.
    `.trim();

    const blob = new Blob([conteudo], {
      type: "text/plain;charset=utf-8",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "recibo.txt";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-50/80 to-gray-100/50 dark:from-background dark:via-background/80 dark:to-muted/20 p-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <Card className="border-emerald-100 dark:border-emerald-900/50 shadow-xl dark:shadow-emerald-900/20 bg-white/50 dark:bg-card/50 backdrop-blur-xl">
          <CardHeader className="flex flex-col items-center pb-2 pt-8">
            <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-foreground text-center">
              Pagamento Confirmado!
            </h1>
            <p className="text-muted-foreground text-center max-w-[280px]">
              Sua assinatura foi processada com sucesso e seu plano já está ativo.
            </p>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-border/50">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Aprovado
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Método</span>
                <span className="font-medium text-foreground">
                  Cartão de Crédito
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Data</span>
                <span className="font-medium text-foreground">
                  {new Date().toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pb-8">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20"
              onClick={() => router.push("/dashboard")}
            >
              Voltar para meu painel
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={baixarRecibo}
            >
              <Receipt className="mr-2 h-4 w-4" />
              Baixar Recibo
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
