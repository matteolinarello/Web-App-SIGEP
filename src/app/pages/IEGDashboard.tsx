import { Activity, Users, TrendingUp, MapPin, Download, Eye, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function IEGDashboard() {
  const hourlyData = [
    { hour: "09:00", visitors: 850, exhibitors: 120 },
    { hour: "10:00", visitors: 1420, exhibitors: 180 },
    { hour: "11:00", visitors: 2100, exhibitors: 220 },
    { hour: "12:00", visitors: 1800, exhibitors: 190 },
    { hour: "13:00", visitors: 1200, exhibitors: 150 },
    { hour: "14:00", visitors: 2300, exhibitors: 240 },
    { hour: "15:00", visitors: 2800, exhibitors: 280 },
    { hour: "16:00", visitors: 2500, exhibitors: 260 },
    { hour: "17:00", visitors: 1900, exhibitors: 210 },
  ];

  const hallData = [
    { name: "Padiglione A", current: 3200, capacity: 5000, percentage: 64 },
    { name: "Padiglione B", current: 2800, capacity: 4500, percentage: 62 },
    { name: "Padiglione C", current: 1900, capacity: 3500, percentage: 54 },
    { name: "Sala Conferenze", current: 450, capacity: 800, percentage: 56 },
  ];

  const topStands = [
    { id: "A-45", name: "Dolce Italia", visits: 340, avgTime: "8:30", leads: 42 },
    { id: "B-12", name: "Pasticceria Moderna", visits: 310, avgTime: "7:45", leads: 38 },
    { id: "C-23", name: "Chocolat Premium", visits: 295, avgTime: "9:15", leads: 41 },
    { id: "A-78", name: "Caffè & Co", visits: 280, avgTime: "6:20", leads: 35 },
  ];

  const alerts = [
    { id: "1", type: "warning", message: "Padiglione A: Capacità al 90%", time: "5 min fa" },
    { id: "2", type: "info", message: "Picco affluenza previsto alle 15:30", time: "10 min fa" },
    { id: "3", type: "success", message: "Tasso di conversione lead +15%", time: "15 min fa" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-chart-2/5 to-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard IEG</h1>
            <p className="text-muted-foreground">Monitoraggio Real-time Flussi e Analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Live View
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Esporta
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-primary" />
                <Badge variant="secondary">Live</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">8,347</div>
              <div className="text-sm text-muted-foreground">Visitatori Presenti</div>
              <div className="mt-2 text-xs text-green-600 font-medium">↑ +12% vs ieri</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-5 w-5 text-green-600" />
                <Badge variant="secondary">Real-time</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">23.5k</div>
              <div className="text-sm text-muted-foreground">Totale Check-in</div>
              <div className="mt-2 text-xs text-green-600 font-medium">↑ +8% vs target</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <Badge variant="secondary">Oggi</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">6.2</div>
              <div className="text-sm text-muted-foreground">Tempo Medio (ore)</div>
              <div className="mt-2 text-xs text-blue-600 font-medium">↑ +0.5h vs ieri</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <Badge variant="secondary">Attivi</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">Stand Monitorati</div>
              <div className="mt-2 text-xs text-purple-600 font-medium">100% online</div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Alert e Notifiche
              </CardTitle>
              <Badge>{alerts.length} attivi</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    alert.type === "warning"
                      ? "bg-yellow-50 border-yellow-200"
                      : alert.type === "info"
                      ? "bg-blue-50 border-blue-200"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <AlertCircle
                    className={`h-5 w-5 flex-shrink-0 ${
                      alert.type === "warning"
                        ? "text-yellow-600"
                        : alert.type === "info"
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Trend Affluenza */}
          <Card>
            <CardHeader>
              <CardTitle>Trend Affluenza Oraria</CardTitle>
              <CardDescription>Visitatori vs Espositori attivi</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stackId="1"
                    stroke="#e8405a"
                    fill="#e8405a"
                    name="Visitatori"
                  />
                  <Area
                    type="monotone"
                    dataKey="exhibitors"
                    stackId="2"
                    stroke="#70141f"
                    fill="#70141f"
                    name="Espositori"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Occupazione Padiglioni */}
          <Card>
            <CardHeader>
              <CardTitle>Occupazione Padiglioni</CardTitle>
              <CardDescription>Capacità in tempo reale</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hallData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#e8405a" name="Presenti" />
                  <Bar dataKey="capacity" fill="#e5e7eb" name="Capacità" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Heatmap e Top Stands */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Heatmap */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Heatmap Flussi Real-time
              </CardTitle>
              <CardDescription>Densità visitatori per area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-secondary to-muted rounded-lg p-6 relative overflow-hidden">
                {/* Simulazione Heatmap */}
                <div className="absolute inset-0 p-6">
                  <div className="grid grid-cols-3 gap-4 h-full">
                    {hallData.map((hall, idx) => (
                      <div
                        key={hall.name}
                        className="rounded-lg relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, 
                            rgba(232, 64, 90, ${hall.percentage / 100}) 0%, 
                            rgba(112, 20, 31, ${hall.percentage / 150}) 100%)`,
                        }}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 backdrop-blur-sm bg-black/10">
                          <div className="text-center">
                            <div className="text-2xl font-bold mb-1">{hall.percentage}%</div>
                            <div className="text-xs font-medium">{hall.name}</div>
                            <div className="text-xs opacity-80 mt-1">
                              {hall.current} / {hall.capacity}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legenda */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
                  <div className="font-semibold mb-2">Densità</div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded bg-primary/20"></div>
                      <div className="w-4 h-4 rounded bg-primary/50"></div>
                      <div className="w-4 h-4 rounded bg-primary"></div>
                    </div>
                    <span>Bassa → Alta</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Stands */}
          <Card>
            <CardHeader>
              <CardTitle>Stand Più Visitati</CardTitle>
              <CardDescription>Top 4 performance oggi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStands.map((stand, idx) => (
                  <div key={stand.id} className="p-3 rounded-lg border bg-card">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            #{idx + 1}
                          </Badge>
                          <span className="font-semibold text-sm">{stand.id}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{stand.name}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="font-semibold text-primary">{stand.visits}</div>
                        <div className="text-muted-foreground">Visite</div>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-600">{stand.avgTime}</div>
                        <div className="text-muted-foreground">T. Medio</div>
                      </div>
                      <div>
                        <div className="font-semibold text-green-600">{stand.leads}</div>
                        <div className="text-muted-foreground">Lead</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
