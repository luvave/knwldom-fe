import { useAuth0 } from '@auth0/auth0-react';
import { ErrorBoundary } from 'react-error-boundary';
import { GraphPageError } from './GraphPageError';
import { Suspense } from 'react';
import { CenteredLoading } from '../../components/common/CenteredLoading';
import { GraphPage } from './GraphPage';
import { createKnowledgeGraph, createUser, useGetGraphsForTheUser } from '../../services/generatedApi/api';
import useGetData from '../../hooks/useGetData';
import { Button } from '../../components/common/Buttons/Button';
import { FloatingContainer } from '../../components/common/Containers/FloatingContainer';
import { useTranslation } from 'react-i18next';
import { getUserId } from '../../utils/auth';

const GraphPageLoader = () => {
  const { user } = useAuth0();
  const { t } = useTranslation();
  const { data, refetch } = useGetGraphsForTheUser(getUserId(user?.sub), { query: { suspense: true } });

  const getInitialGraph = async () => {
    let graphs = data;
    if (!Array.isArray(data) || data.length === 0) {
      await createUser({
        userId: getUserId(user?.sub),
        displayName: user?.name ?? '',
      });
      await createKnowledgeGraph({
        userId: getUserId(user?.sub) ?? '',
        graphName: `${user?.name ?? ''} default graph`,
        graphUri: `${getUserId(user?.sub)}_initial_graph`,
        graphTypeUri: 'Public',
        isDefault: true,
      });
      const ret = await refetch();
      graphs = ret.data;
    }
    const initialGraph = graphs?.find((g) => g.isDefault);
    if (!Array.isArray(graphs) || graphs.length === 0 || typeof initialGraph === 'undefined') {
      throw new Error(t('graphPage.initialGraphError'));
    }
    return initialGraph;
  };

  const initialGraph = useGetData(getInitialGraph());

  return (
    <>
      {initialGraph && (
        <GraphPage
          allGraphs={data ?? []}
          initialGraph={initialGraph}
        />
      )}
    </>
  );
};

export const GraphPageWrapped = () => {
  const { logout } = useAuth0();
  const { t } = useTranslation();

  const onLogout = () => logout({ logoutParams: { returnTo: import.meta.env.VITE_LANDING_PAGE } });

  return (
    <>
      <FloatingContainer type='left'>
        <Button
          type='secondary'
          onClick={onLogout}
        >
          {t('landingPage.logout')}
        </Button>
      </FloatingContainer>
      <ErrorBoundary FallbackComponent={GraphPageError}>
        <Suspense fallback={<CenteredLoading />}>
          <GraphPageLoader />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
