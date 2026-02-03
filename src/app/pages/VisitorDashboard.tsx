import { useState, useEffect } from "react";
import { MapPin, QrCode, Calendar, Bot, Users, Navigation, Search, Star, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useSearchParams } from "react-router";
import Papa from "papaparse";
import eventiCsv from "../../data/eventi.csv?raw";
import espositoriCsv from "../../data/espositori.csv?raw";

export default function VisitorDashboard() {
  const [searchParams] = useSearchParams();
  const [selectedStand, setSelectedStand] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("map");

  // Check URL params for tab
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "ai") {
      setActiveTab("ai");
    }
  }, [searchParams]);

  interface Exhibitor {
    id: string;
    name: string;
    hall: string;
    stand: string;
    category: string;
    distance: string;
  }

  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);

  interface Event {
    id: string;
    title: string;
    time: string;
    hall: string;
    seats: number;
    booked: number;
  }

  const [realEvents, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    Papa.parse<any>(eventiCsv, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const loadedEvents = results.data.slice(0, 5).map((row: any, index: number) => ({
          id: index.toString(),
          title: row["card-event-title"] || "Evento Senza Titolo",
          time: row["times"] || "Orario da definire",
          hall: row["label"] || "Luogo da definire", // Using 'label' for location as user mentioned card-event-title and times, likely 'label' is date/location
          seats: 100, // Placeholder
          booked: Math.floor(Math.random() * 80), // Placeholder
        }));
        setEvents(loadedEvents);
      },
    });

    Papa.parse<any>(espositoriCsv, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const loadedExhibitors = results.data.slice(0, 50).map((row: any, index: number) => ({
          id: index.toString(),
          name: row["card-digitalprofile-name"] || "Nome non disponibile",
          hall: row["line-clamp-2"] ? row["line-clamp-2"].split(" ")[0] : "N/A", // Extract approximate hall/stand info
          stand: row["card-digitalprofile-position"] || "Posizione",
          category: "Espositore", // Default category as it's not explicit in CSV
          distance: `${Math.floor(Math.random() * 300) + 50}m` // Simulated distance
        }));
        setExhibitors(loadedExhibitors);
      },
    });
  }, []);



  const savedContacts = [
    { id: "1", name: "Marco Rossi", company: "Dolce Italia", role: "Sales Manager", date: "Oggi, 09:30" },
    { id: "2", name: "Laura Bianchi", company: "Pasticceria Moderna", role: "CEO", date: "Oggi, 11:15" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard Visitatore</h1>
          <p className="text-muted-foreground">Naviga, scopri e connettiti con gli espositori</p>
        </div>

        <Tabs defaultValue={activeTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="map" className="gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Mappa</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Eventi</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2">
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">Contatti</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
          </TabsList>

          {/* Mappa & AR */}
          <TabsContent value="map" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Mappa Interattiva */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-primary" />
                      Mappa Interattiva Indoor
                    </CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      AR Disponibile
                    </Badge>
                  </div>
                  <CardDescription>
                    Tocca uno stand per la navigazione AR
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-gradient-to-br from-secondary to-muted rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-border overflow-hidden">
                    {/* Simulazione Mappa */}
                    <div className="absolute inset-0 p-8">
                      <div className="grid grid-cols-3 gap-4 h-full">
                        {["Padiglione A", "Padiglione B", "Padiglione C"].map((hall, idx) => (
                          <div key={hall} className="bg-white rounded-lg p-4 shadow-sm border">
                            <div className="font-semibold text-sm mb-2 text-center">{hall}</div>
                            <div className="space-y-2">
                              {exhibitors.filter(e => e.hall === ["A", "B", "C"][idx]).map((exhibitor) => (
                                <button
                                  key={exhibitor.id}
                                  onClick={() => setSelectedStand(exhibitor.id)}
                                  className={`w-full p-2 rounded text-xs text-left transition-all ${selectedStand === exhibitor.id
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary hover:bg-muted"
                                    }`}
                                >
                                  <div className="font-medium">{exhibitor.stand}</div>
                                  <div className="truncate opacity-80">{exhibitor.name}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AR Overlay */}
                    {selectedStand && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl max-w-sm mx-4 shadow-2xl">
                          <h3 className="text-lg font-bold mb-2">Navigazione AR Attiva</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Segui le frecce AR sul tuo dispositivo per raggiungere lo stand selezionato
                          </p>
                          <Button onClick={() => setSelectedStand(null)} className="w-full">
                            Chiudi
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Lista Espositori */}
              <Card>
                <CardHeader>
                  <CardTitle>Espositori Vicini</CardTitle>
                  <CardDescription>Basato sulla tua posizione</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Cerca espositore..." className="pl-9" />
                    </div>
                    {exhibitors.map((exhibitor) => (
                      <div
                        key={exhibitor.id}
                        className="p-3 rounded-lg border bg-card hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setSelectedStand(exhibitor.id)}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-sm">{exhibitor.name}</h4>
                          <Badge variant="outline" className="text-xs">{exhibitor.distance}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{exhibitor.category}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>Hall {exhibitor.hall} - Stand {exhibitor.stand}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Eventi */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Eventi e Workshop
                </CardTitle>
                <CardDescription>Prenota il tuo posto per le sessioni in programma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {realEvents.map((event) => (
                    <div key={event.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge variant={event.booked >= event.seats ? "destructive" : "secondary"}>
                          {event.seats - event.booked} posti
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.hall}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {event.booked}/{event.seats} prenotati
                          </span>
                        </div>
                        <Button size="sm" disabled={event.booked >= event.seats}>
                          {event.booked >= event.seats ? "Sold Out" : "Prenota"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contatti QR */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-primary" />
                    Scansiona QR Code
                  </CardTitle>
                  <CardDescription>Salva i contatti degli espositori</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center p-6">
                      <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Inquadra il QR Code dello stand per salvare il contatto
                      </p>
                      <Button>Attiva Scanner</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contatti Salvati</CardTitle>
                  <CardDescription>{savedContacts.length} contatti nel tuo network</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {savedContacts.map((contact) => (
                      <div key={contact.id} className="p-4 rounded-lg border bg-card">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{contact.name}</h4>
                            <p className="text-sm text-muted-foreground">{contact.role}</p>
                          </div>
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{contact.company}</span>
                          <span className="text-muted-foreground">{contact.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Assistant */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Assistente AI SIGEP
                </CardTitle>
                <CardDescription>Chiedi informazioni su espositori, eventi e servizi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Chat simulato */}
                  <div className="h-96 bg-secondary/30 rounded-lg p-4 overflow-y-auto space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm">
                          Ciao! Sono l'assistente virtuale di SIGEP World. Come posso aiutarti oggi?
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 shadow-sm max-w-sm">
                        <p className="text-sm">Dove posso trovare stand di gelateria?</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm mb-2">
                          Ho trovato 12 stand di gelateria. I più vicini a te sono:
                        </p>
                        <ul className="text-sm space-y-1">
                          <li>• Dolce Italia - Hall A, Stand 45 (120m)</li>
                          <li>• Gelato Artigiano - Hall A, Stand 52 (180m)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Scrivi il tuo messaggio..." />
                    <Button>Invia</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}