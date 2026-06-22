import { describe, it, expect } from 'vitest'; 

import { render, screen } from '@testing-library/react'; 

import { EmptyRecordsNotice } from '@/components/EmptyRecordsNotice'; 

  

describe('EmptyRecordsNotice', () => { 

  it('shows a no-records message when totalCount is 0', () => { 

    render(<EmptyRecordsNotice totalCount={0} />); 

    expect( 

      screen.getByText(/no records found near these coordinates/i), 

    ).toBeInTheDocument(); 

  }); 

  

  it('renders nothing when there are records', () => { 

    render(<EmptyRecordsNotice totalCount={1} />); 

    expect( 

      screen.queryByText(/no records found near these coordinates/i), 

    ).toBeNull(); 

  }); 

}); 