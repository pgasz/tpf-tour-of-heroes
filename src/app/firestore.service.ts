import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Actors } from './models/actors.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private dbPath = '/actors';

  actorsRef: AngularFirestoreCollection<Actors>;
  constructor(private db: AngularFirestore) {
    this.actorsRef = db.collection(this.dbPath);
  }
  getAll(): AngularFirestoreCollection<Actors> {
    return this.actorsRef;
  }

  create(actor: Actors): any {
    return this.actorsRef.add({ ...actor });
  }

  update(id: string, data: any): Promise<void> {
    return this.actorsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.actorsRef.doc(id).delete();
  }
}
