import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Database, ref, set, listVal, list, update, push, remove, onValue } from '@angular/fire/database'; // Correct import for Firebase Database
import { forkJoin, from, merge, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmsService {
  private http = inject(HttpClient);
  private db = inject(Database);

  getEnergyUsage(): Observable<any> {
    const energyUsageRef = ref(this.db, 'energy-usage');

    return new Observable(observer => {
      const unsubscribe = onValue(energyUsageRef, snapshot => {
        const data: any[] = [];
        snapshot.forEach(childSnapshot => {
          data.push({ key: childSnapshot.key, ...childSnapshot.val() });
        });
        observer.next(data);
      }, error => {
        observer.error(error);
      });

      // Cleanup logic when observable is unsubscribed
      return () => unsubscribe();
    });
  }

  // Update an individual energy usage entry in Firebase
  async updateEnergyUsage(key: string, data: any): Promise<void> {
    const energyUsageRef = ref(this.db, `energy-usage/${key}`);
    await update(energyUsageRef, data);
    return this.updateEnergyUsers(key, data);
  }

  updateEnergyUsers(key: string, data: any): Promise<void> {
    const energyUsageUsersRef = ref(this.db, `energy-usage/${key}/users`);
    return set(energyUsageUsersRef, data.users); // Update the specific entry in Firebase
  }

  // Generate a new key for a new entry
  generateNewKey(): string {
    const newRef = push(ref(this.db, 'energy-usage')); // Push a new reference to generate a key
    return newRef.key as string; // Return the generated key
  }

  // Delete an energy usage entry from Firebase
  deleteEnergyUsage(key: string): Promise<void> {
    const energyUsageRef = ref(this.db, `energy-usage/${key}`);
    return remove(energyUsageRef); // Remove the specific entry from Firebase
  }
}
