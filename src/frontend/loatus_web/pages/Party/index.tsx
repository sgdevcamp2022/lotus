import React, { useCallback, useState } from 'react';
import { Expedition, ItemLevel, Lists, Memo, PartyContainer, RaidTime } from '@pages/Party/styles';
import { Button, Modal } from 'react-bootstrap';
import dayjs from 'dayjs';

const menuText = [
  ' ',
  '아이템 레벨',
  '원정대 레벨',
  '대표 캐릭터 정보',
  '직업',
  '직업각인',
  '특성',
  '각인',
  '장신구',
  '무기',
  '보석',
  '트라이포스',
  '카드',
];

const menuText2 = ['레이드', '파티장', '평균 아이템 레벨', '모집 인원', '시간', '메모', '등록시간', ' '];

const menuItem = (itemLevel: number, expeditionLevel: number, raidTime: Date) => [
  <div>
    <img src={'https://i.ytimg.com/vi/wdPqzj6LfoM/maxresdefault.jpg'} alt={'레이드 이름'} width={'100%'} />
    <span>쿠크레이드</span>
  </div>,
  <div className={'partyking'}>방패막기 가로쉬</div>,
  <ItemLevel>{itemLevel}</ItemLevel>,
  <Expedition>{expeditionLevel}</Expedition>,
  <RaidTime>{dayjs(raidTime).format('HH:mm A')}</RaidTime>,
  <Memo>안녕하세요? 쿠크 코 만지고 오실 분</Memo>,
  <RaidTime>{dayjs(raidTime).format('HH:mm A')}</RaidTime>,
  <Button onClick={() => alert('ihihhi')}>신청하기</Button>,
];

const Party = () => {
  const [showPartyModal, setShowPartyModal] = useState(false);
  const [partyInfo, setPartyInfo] = useState(0);
  const toggleShowPartyModal = useCallback((partId: number) => {
    setPartyInfo(partId);
    setShowPartyModal((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => setShowPartyModal(false), []);

  return (
    <div style={{ overflowX: 'auto', overflowY: 'hidden', paddingBottom: '7rem' }}>
      <Modal show={showPartyModal} onHide={handleClose} backdrop={'static'} keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>{partyInfo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>야이 떄끼야</Modal.Body>
        <Modal.Footer>
          <Button
            variant={'secondary'}
            onClick={(event) => {
              event.stopPropagation();
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <PartyContainer className={'w-full'}>
        <div className={'menubar'}>
          {menuText2.map((menu, key) => (
            <span className={'text-3xs'} key={key}>
              {menu}
            </span>
          ))}
        </div>
        <Lists>
          <li>
            <div className={'MulCollapse-wrapper'} onClick={() => toggleShowPartyModal(1)}>
              {menuItem(832, 4, new Date()).map((menu, key) => (
                <div className={'partner'} key={key}>
                  {menu}
                </div>
              ))}
            </div>
          </li>
        </Lists>
      </PartyContainer>
    </div>
  );
};

export default Party;
