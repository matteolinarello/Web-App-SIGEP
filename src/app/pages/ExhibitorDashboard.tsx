import { useState } from "react";
import { QrCode, Camera, Mic, Users, TrendingUp, Calendar, FileText, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Progress } from "@/app/components/ui/progress";

export default function ExhibitorDashboard() {
  const [leads, setLeads] = useState([
    { id: "1", name: "Marco Rossi", company: "Pasticceria Roma", interest: "alta", source: "QR Code", time: "09:30", notes: "Interessato a nuovi prodotti gelato" },
    { id: "2", name: "Laura Bianchi", company: "Caffè & Dolci SRL", interest: "media", source: "Stand Visit", time: "11:15", notes: "" },
    { id: "3", name: "Giuseppe Verdi", company: "Gelateria Artigiana", interest: "alta", source: "QR Code", time: "14:20", notes: "Richiesta catalogo completo" },
  ]);

  const stats = [
    { label: "Lead Acquisiti", value: "47", change: "+12", icon: Users, color: "text-primary" },
    { label: "Interesse Alto", value: "23", change: "+5", icon: TrendingUp, color: "text-green-600" },
    { label: "Appuntamenti", value: "8", change: "+2", icon: Calendar, color: "text-blue-600" },
    { label: "Conversion Rate", value: "48%", change: "+3%", icon: TrendingUp, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard Espositore</h1>
          <p className="text-muted-foreground">CRM Mobile per Lead Generation</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <Badge variant="secondary" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="acquire" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="acquire" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Acquisizione</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Lead CRM</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Acquisizione Lead */}
          <TabsContent value="acquire" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Scanner QR */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-primary" />
                    Scanner QR Code
                  </CardTitle>
                  <CardDescription>Scansiona il badge del visitatore</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border mb-4">
                    <div className="text-center p-6">
                      <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Inquadra il QR Code del badge visitatore
                      </p>
                      <Button className="w-full">Avvia Scanner</Button>
                    </div>
                  </div>
                  <div className="text-xs text-center text-muted-foreground">
                    Ultima scansione: 2 minuti fa
                  </div>
                </CardContent>
              </Card>

              {/* Input Multimodale */}
              <Card>
                <CardHeader>
                  <CardTitle>Input Multimodale</CardTitle>
                  <CardDescription>Aggiungi foto o note vocali al lead</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Upload Foto */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Foto Biglietto da Visita</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Scatta o carica foto
                      </p>
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Aggiungi Foto
                      </Button>
                    </div>
                  </div>

                  {/* Nota Vocale */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Nota Vocale</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Mic className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Registra memo vocale
                      </p>
                      <Button variant="outline" size="sm">
                        <Mic className="h-4 w-4 mr-2" />
                        Registra Audio
                      </Button>
                    </div>
                  </div>

                  {/* Note Testuali */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Note</label>
                    <Textarea
                      placeholder="Aggiungi note sul lead..."
                      rows={3}
                    />
                  </div>

                  <Button className="w-full">
                    Salva Lead
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CRM Lead */}
          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Database Lead
                    </CardTitle>
                    <CardDescription>{leads.length} contatti acquisiti oggi</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuovo Lead
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-2 mb-4">
                    <Input placeholder="Cerca lead..." className="flex-1" />
                    <Button variant="outline">Filtra</Button>
                  </div>
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-lg border bg-card hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{lead.name}</h4>
                          <p className="text-sm text-muted-foreground">{lead.company}</p>
                        </div>
                        <Badge
                          variant={
                            lead.interest === "alta"
                              ? "destructive"
                              : lead.interest === "media"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {lead.interest}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span>📍 {lead.source}</span>
                        <span>🕐 {lead.time}</span>
                      </div>
                      {lead.notes && (
                        <p className="text-sm bg-secondary/50 p-2 rounded mb-3">
                          {lead.notes}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <FileText className="h-3 w-3 mr-1" />
                          Dettagli
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Follow-up
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Acquisizione</CardTitle>
                  <CardDescription>Lead per fascia oraria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "09:00 - 11:00", count: 12, max: 20 },
                      { time: "11:00 - 13:00", count: 18, max: 20 },
                      { time: "13:00 - 15:00", count: 8, max: 20 },
                      { time: "15:00 - 17:00", count: 9, max: 20 },
                    ].map((slot) => (
                      <div key={slot.time}>
                        <div className="flex items-center justify-between mb-2 text-sm">
                          <span>{slot.time}</span>
                          <span className="font-semibold">{slot.count} lead</span>
                        </div>
                        <Progress value={(slot.count / slot.max) * 100} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Livello Interesse</CardTitle>
                  <CardDescription>Distribuzione qualità lead</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { level: "Interesse Alto", count: 23, color: "bg-red-500", percentage: 49 },
                      { level: "Interesse Medio", count: 15, color: "bg-yellow-500", percentage: 32 },
                      { level: "Interesse Basso", count: 9, color: "bg-gray-400", percentage: 19 },
                    ].map((item) => (
                      <div key={item.level}>
                        <div className="flex items-center justify-between mb-2 text-sm">
                          <span>{item.level}</span>
                          <span className="font-semibold">{item.count} ({item.percentage}%)</span>
                        </div>
                        <div className="h-3 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Fonte di Acquisizione</CardTitle>
                  <CardDescription>Come i visitatori ti hanno trovato</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { source: "QR Code Scanner", count: 28, icon: QrCode },
                      { source: "Visita Stand", count: 14, icon: Users },
                      { source: "App Mappa", count: 5, icon: TrendingUp },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.source} className="p-4 bg-secondary/50 rounded-lg text-center">
                          <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold mb-1">{item.count}</div>
                          <div className="text-sm text-muted-foreground">{item.source}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
