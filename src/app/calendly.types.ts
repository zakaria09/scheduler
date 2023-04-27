export interface UserResponse {
  resource: User
}

export interface User {
  uri: string
  name: string
  slug: string
  email: string
  scheduling_url: string
  timezone: string
  avatar_url: string
  created_at: string
  updated_at: string
  current_organization: string
}

export interface ScheduledEvent {
  isLoading: boolean;
  error?: any;
  collection: Collection[];
  pagination: Pagination;
}

export interface Pagination {
  count: number;
  next_page: string;
  previous_page: string;
  next_page_token: string;
  previous_page_token: string;
}

export interface Collection {
  uri: string;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
  event_type: string;
  location: Location;
  invitees_counter: Inviteescounter;
  created_at: string;
  updated_at: string;
  event_memberships: Eventmembership[];
  event_guests: Eventguest[];
  calendar_event: Calendarevent;
}

interface Calendarevent {
  kind: string;
  external_id: string;
}

interface Eventguest {
  email: string;
  created_at: string;
  updated_at: string;
}

interface Eventmembership {
  user: string;
}

interface Inviteescounter {
  total: number;
  active: number;
  limit: number;
}

interface Location {
  type: string;
  location: string;
}
