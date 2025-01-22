import {Injectable} from '@angular/core';

/**
 * class to manage the storage facility
 */
@Injectable({ providedIn: 'root' })
export class SecureStorageService implements Storage {
  /**
   * @description
   * Method to return the encrypted the data received
   * @param value
   */
  private static encode = (value: string) => btoa(value);

  /**
   * @description
   * Method to return the unencrypted the data
   * @param value
   */
  private static decode = (value: string) => atob(value);

  /**
   * @description
   * Method that clears all keys stored
   */
  readonly clear = () => localStorage.clear();

  /**
   * @description
   * Method that returns the name of the nth key received
   */
  readonly key = (index: number) => localStorage.key(index);

  /**
   * @description
   * Method that will remove the received key from the store
   * @param key key to will be removed from the store
   */
  readonly removeItem = (key: string) => localStorage.removeItem(key);

  /**
   * @description
   * Method that return the count of items stored in the store
   */
  get length(): number {
    return localStorage.length;
  }

  /**
   * Method to set encrypted the item in the store
   * @param key key to which the data are to be assigned
   * @param value Data to be stored
   */
  setItem(key: string, value: string) {
    localStorage.setItem(key, SecureStorageService.encode(value));
  }

  /**
   * @description
   * Method to get unencrypted a specific from the store
   * @param key key of the item to get
   */
  getItem(key: string): string | null {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return SecureStorageService.decode(value);
  }
}
