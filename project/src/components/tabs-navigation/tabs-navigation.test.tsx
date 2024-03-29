import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TabsNavigation from './tabs-navigation';
import { tabNames } from '../../const';


describe('Component:TabsNavigation', () => {
  const activeTab = tabNames[0];
  const id = '2';

  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <TabsNavigation activeTab={activeTab} id={id} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('tabs-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('active-tab')).toHaveTextContent(activeTab);
  });

  it('should change active tab by click on inactive tab', () => {
    render(
      <MemoryRouter>
        <TabsNavigation activeTab={activeTab} id={id} />
      </MemoryRouter>
    );

    const inactiveTab = screen.getAllByTestId('inactive-tab')[0];
    expect(inactiveTab).toHaveTextContent(tabNames[1]);
    fireEvent.click(inactiveTab);

    //became active
    expect(inactiveTab).toHaveClass('active');
  });
});
