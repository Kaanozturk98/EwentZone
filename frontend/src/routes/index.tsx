import NProgress from "nprogress";
import { Switch, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useMemo, FC, Fragment } from "react";
// components
import LoadingScreen from "components/LoadingScreen";
// layouts
import HomeLayout from "layouts/home";

function RouteProgress(props: any) {
  NProgress.configure({
    speed: 500,
    showSpinner: false,
  });

  useMemo(() => {
    NProgress.start();
  }, []);

  useEffect(() => {
    NProgress.done();
  }, []);

  return <Route {...props} />;
}

export function renderRoutes(
  routes: { exact: boolean; path: string; layout: FC; component: FC }[]
) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map(
          (
            route: { exact: boolean; path: string; layout: FC; component: FC },
            idx: number
          ) => {
            const Component: FC = route.component;
            const Layout: FC = route.layout || Fragment;

            return (
              <RouteProgress
                key={`routes-${idx}`}
                path={route.path}
                exact={route.exact}
                render={(props: any) => (
                  <Layout>
                    <Component {...props} />
                  </Layout>
                )}
              />
            );
          }
        )}
      </Switch>
    </Suspense>
  );
}

const routes: { exact: boolean; path: string; layout: FC; component: FC }[] = [
  // Home Routes
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("../views/LandingPage")),
  },
];

export default routes;
