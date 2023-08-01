import { type UserGraphDto } from '../../types/generatedApi';
import { useRef, useState } from 'react';
import { FloatingContainer } from '../../components/common/Containers/FloatingContainer';
import { Button } from '../../components/common/Buttons/Button';
import { AddNewModal } from '../../components/AddNewModal/AddNewModal';
import { useGetRelationForGraph } from '../../services/generatedApi/api';
import { useTranslation } from 'react-i18next';
import { Graph } from '../../components/Graph/Graph';

interface Props {
  allGraphs: UserGraphDto[];
  initialGraph: UserGraphDto;
}

export const GraphPage = ({ initialGraph, allGraphs }: Props) => {
  const { t } = useTranslation();
  const [currentGraph] = useState<UserGraphDto>(initialGraph);
  const [addNewModalOpen, setAddNewModalOpen] = useState<boolean>(false);

  const { data, refetch } = useGetRelationForGraph(currentGraph.graph?.graphUri ?? '');
  const graphRef = useRef(null);

  return (
    <>
      <FloatingContainer type='right'>
        <Button
          type='gradient'
          onClick={() => setAddNewModalOpen(true)}
        >
          {t('graphPage.addNew')}
        </Button>
      </FloatingContainer>

      <Graph
        graphStartUri={currentGraph.graph?.graphUri ?? ''}
        graphRef={graphRef}
        type='3D'
        relations={data ?? []}
      />

      <AddNewModal
        graphUri={currentGraph.graph?.graphUri ?? ''}
        open={addNewModalOpen}
        setOpen={setAddNewModalOpen}
        afterAddFunc={refetch}
        currentRelationCount={data?.length ?? 0}
      />
    </>
  );
};
