import { useState } from 'react';
import { useCreateGameMutation } from '../../services/gameApi';
import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import Modal from '../global/Modal';

export default function NewGame({ onNewGame }) {
  const [createGame, { error, isLoading }] = useCreateGameMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [gameType, setGameType] = useState('solo');
  const submitNewGame = async () => {
    await createGame({
      title,
      gameType,
    });
    onNewGame();
    setModalOpen(false);
  };
  return (
    <div className='flex flex-container flex-col'>
      <div className='flex flex-container justify-center'>
        <PrimaryButtonWithIcon
          aria-controls='basic-modal'
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(true);
          }}
          disabled={isLoading}
        >
          <Baseball />
          <span className='ml-2'>Create New Game</span>
        </PrimaryButtonWithIcon>
      </div>
      <Modal title='Create New Game' modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='p-4'>
          <div className='mb-4'>
            <label htmlFor='gameType' className='block text-sm font-medium text-gray-700'>
              Game Type
            </label>
            <select
              id='gameType'
              name='gameType'
              value={gameType}
              onChange={(e) => setGameType(e.target.value)}
              className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            >
              <option value='solo'>Solo</option>
              <option value='multi'>Multiplayer</option>
            </select>
          </div>
          <div className='mb-4'>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            />
          </div>

          <div className='flex justify-end'>
            <PrimaryButtonWithIcon onClick={submitNewGame} disabled={isLoading}>
              <span>Create Game</span>
            </PrimaryButtonWithIcon>
          </div>
        </div>
      </Modal>
    </div>
  );
}
