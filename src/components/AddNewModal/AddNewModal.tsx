import { BasicModal } from '../common/BasicModal';
import DOMPurify from 'dompurify';
import { useInput } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { lookupSearch } from '../../services/lookup';
import { formatResourceFromLookup } from '../../utils/resources';
import { Button } from '../common/Buttons/Button';
import { BasicContainer } from '../common/Containers/BasicContainer';
import { BasicInput } from '../common/Input/BasicInput';
import { addRelation, addRelationType, useGetAllRelationTypes } from '../../services/generatedApi/api';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '../common/Autocomplete/Autocomplete';
import { useState } from 'react';
import { type RelationTypeDto } from '../../types/generatedApi';

interface Props {
  graphUri: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  afterAddFunc: () => void;
  currentRelationCount: number;
}

export const AddNewModal = ({ graphUri, afterAddFunc, open, setOpen, currentRelationCount }: Props) => {
  const { t } = useTranslation();
  const { value, reset, bindings } = useInput('');
  const [selectedRelationType, setSelectedRelationType] = useState<RelationTypeDto | null>();

  const { data: lookupData, refetch: lookupRefetch } = useQuery({
    queryKey: ['lookupSearch', value],
    queryFn: () => lookupSearch(value),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: relationTypes,
    refetch: refetchRelationTypes,
    isFetching: relationTypesFetching,
  } = useGetAllRelationTypes();

  const addEntity = async (value: string) => {
    try {
      await addRelation({
        relationType: {
          relationUri: selectedRelationType?.relationUri,
        },
        relationUri: `relation_${graphUri}_${currentRelationCount + 1}`,
        from: graphUri,
        to: value,
      });
      if (typeof afterAddFunc === 'function') {
        afterAddFunc();
      }
      setOpen(false);
    } catch {
      throw new Error(t('graphPage.addNewModal.addRelationError'));
    }
  };

  const addRelationTypeOption = async (value: string) => {
    try {
      await addRelationType({
        relationName: value ?? '',
        relationUri: value ?? '',
      });
      await refetchRelationTypes();
    } catch {
      throw new Error(t('graphPage.addNewModal.addRelationTypeError'));
    }
  };

  const handleClick = () => {
    void lookupRefetch();
  };

  const getBody = () => {
    return (
      <BasicContainer>
        <Autocomplete<RelationTypeDto>
          options={relationTypes ?? []}
          value={selectedRelationType ?? null}
          onChange={(newVal) => {
            setSelectedRelationType(newVal);
            if (newVal === null) reset();
          }}
          isClearable
          isLoading={relationTypesFetching}
          getOptionLabel={(rel) => rel.relationName ?? ''}
          onCreateOption={(newRel) => addRelationTypeOption(newRel)}
        />
        <BasicContainer css={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <BasicInput
            onClearClick={reset}
            clearable
            bordered
            color='primary'
            placeholder={t('graphPage.addNewModal.searchPlaceholder')}
            label={t('graphPage.addNewModal.search')}
            value={bindings.value}
            onChange={bindings.onChange}
          />
          <Button
            type='secondary'
            onClick={handleClick}
            disabled={!selectedRelationType}
          >
            {t('graphPage.addNewModal.search')}
          </Button>
        </BasicContainer>
        <BasicContainer css={{ marginTop: '20px' }}>
          {lookupData?.docs?.map((entity) => {
            const { label, resource } = entity;
            if (
              typeof label === 'undefined' ||
              typeof resource === 'undefined' ||
              label.length === 0 ||
              resource.length === 0
            ) {
              return null;
            }
            return (
              <Button
                type='secondary'
                light
                key={label[0]}
                onClick={() => addEntity(formatResourceFromLookup(resource?.[0]))}
              >
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(label[0]) }} />
              </Button>
            );
          }) ?? null}
        </BasicContainer>
      </BasicContainer>
    );
  };

  return (
    <BasicModal
      setOpen={setOpen}
      open={open}
      body={getBody()}
      title={t('graphPage.addNewModal.title')}
    />
  );
};
