import { mount, shallowMount } from '@vue/test-utils';
import PuzzleArea from '@/components/PuzzleArea.vue';

describe('PuzzleArea loads', () => {
    it('renders correct heading text', () => {
        const wrapper = shallowMount(PuzzleArea, {
            props: { imageSrc: 'data:image/png;base64,fakeimage' }
        });
        expect(wrapper.find('h2').text()).toMatch('PUZZLE');
    });

    it('contains the puzzle grid elements', async () => {
        const wrapper = mount(PuzzleArea, {
            props: { imageSrc: 'data:image/png;base64,fakeimage' }
        });
        await wrapper.vm.$nextTick();
        const puzzlePieces = wrapper.findAll('.puzzle-area__piece');
        expect(puzzlePieces.length).toBe(9);
    });

    it('swaps pieces properly', async () => {
        const wrapper = mount(PuzzleArea, {
            props: { imageSrc: 'data:image/png;base64,fakeimage' }
        });
        await wrapper.vm.$nextTick();
        
        const puzzlePieces = [{ id: 1, position: 2, correctPosition: 1 },
                              { id: 2, position: 1, correctPosition: 2 }];

        await wrapper.setData({
            puzzlePieces,
        });

        await wrapper.vm.$nextTick();

        const dragEvent = mockCreateDragEvent();

        const draggedData = puzzlePieces[0];
        wrapper.vm.startDrag(dragEvent, draggedData);

        const targetData = puzzlePieces[1];
        wrapper.vm.onDrop(dragEvent, targetData);

        await wrapper.vm.$nextTick();

        const currentPieces = wrapper.vm.puzzlePieces;
        expect(currentPieces[0].position).toBe(1);
        expect(currentPieces[1].position).toBe(2);
    });

    it('checks win condition properly', async () => {
        const wrapper = mount(PuzzleArea, {
            props: { imageSrc: 'data:image/png;base64,fakeimage' }
        });
        await wrapper.vm.$nextTick();
        
        const puzzlePieces = mockCreatePuzzlePieces();
        const solution = JSON.stringify(puzzlePieces);
        const shuffledPieces = mockShufflePieces(puzzlePieces);

        await wrapper.setData({
            puzzlePieces: shuffledPieces,
            solution,
        });

        await wrapper.vm.$nextTick();

        const dragEvent = mockCreateDragEvent();
        const draggedData = shuffledPieces[0];
        const targetData = shuffledPieces[1];
        wrapper.vm.startDrag(dragEvent, draggedData);
        wrapper.vm.onDrop(dragEvent, targetData);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isSolved).toBe(true);
    });    
});


function mockCreatePuzzlePieces() {
    const pieces = [];
    for(let i = 1; i <= 9; i++) {
        pieces.push({
            id: i,
            position: i,
            correctPosition: i,
        });
    }
    return pieces;
}

function mockShufflePieces(pieces) {
    pieces[0].position = 2;
    pieces[1].position = 1;
    return pieces;
}

function mockCreateDragEvent(data) {
    return {
      preventDefault: jest.fn(),
      dataTransfer: {
        data: { ...data },
        setData: jest.fn(function (key, value) {
          this.data[key] = value
        }),
        getData: jest.fn(function (key) {
          return this.data[key]
        }),
        effectAllowed: '',
        dropEffect: ''
      }
    }
}