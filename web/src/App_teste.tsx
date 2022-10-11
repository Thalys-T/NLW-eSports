// adicionar radix select depois
import * as Select from '@radix-ui/react-select';
import { useEffect, useState } from 'react';
//import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from './components/CreateAdBanner';

import { GameBanner } from './components/GameBanner';

import './styles/main.css'

import logoImg from './assets/eSportslogo.svg'
import { CreateAdModal } from './components/CreateAdModal';


interface Game{
  id: string;
  title: string;
}

export function RadixTest() {

  const [games, setGames] = useState<Game[]>([])

   

  useEffect(() => {
      fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data =>{
        setGames(data)
      })
    }, [])


  return (
    <div>
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder="Escolha o game"/>
          <Select.Icon />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content>
            <Select.ScrollUpButton />
            <Select.Viewport>
              <Select.Item value="" >
                <Select.ItemText />
                <Select.ItemIndicator />
              </Select.Item>

              <Select.Group>
                <Select.Label> Games </Select.Label>
                <Select.Item value="">
                  <Select.ItemText />
                  <Select.ItemIndicator />
                </Select.Item>
              </Select.Group>

              <Select.Separator />
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select.Portal>
      </Select.Root>


      <h1> radix select </h1>
    </div>
  )
}