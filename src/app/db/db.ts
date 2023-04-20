import Dexie, { Table } from 'dexie'

export interface Event {
  id: string,
  description: string
  date: Date
}
export interface Login {
  id: string,
  email: string
  date: Date
}

export class AppDB extends Dexie {
  events!: Table<Event, number>
  logins!: Table<Login, number>

  constructor() {
    super('xd-scheduler')
    this.version(1).stores({
      events: 'id, description, date',
      logins: 'id, email, date'
    })
    this.on('populate', () => this.populate())
  }

  async populate() {
    await this.events.add({
      id: 'test:1',
      description: 'TEst insert1',
      date: new Date()
    })
  }

}
