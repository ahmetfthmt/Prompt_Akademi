/**
 * Design philosophy: Araştırma Laboratuvarı — a routed, task-oriented learning system,
 * not a decorative single-page site.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/AppShell";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Academy from "./pages/Academy";
import Lab from "./pages/Lab";
import Library from "./pages/Library";
import Quiz from "./pages/Quiz";
import Safety from "./pages/Safety";
import Resources from "./pages/Resources";
import ModelStudio from "./pages/ModelStudio";
import LessonDetail from "./pages/LessonDetail";


function Router() {
  return (
    <AppShell>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/dersler/:moduleId/:lessonId"} component={LessonDetail} />
        <Route path={"/dersler"} component={Academy} />
        <Route path={"/laboratuvar"} component={Lab} />
        <Route path={"/ornek-kutuphanesi"} component={Library} />
        <Route path={"/testler"} component={Quiz} />
        <Route path={"/guvenlik"} component={Safety} />
        <Route path={"/model-karsilastirma"} component={ModelStudio} />
        <Route path={"/kaynaklar"} component={Resources} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </AppShell>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
