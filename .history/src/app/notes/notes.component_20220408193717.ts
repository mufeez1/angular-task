import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Notes } from '../user.model';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  user: any;
  notes: Notes;
  notesArr: Notes[] = [];
  noteForm: any;
  noteiD: any;
  constructor(private modalService: NgbModal,private router: Router) { }

  ngOnInit(): void {
    this.notesArr = JSON.parse(localStorage.getItem('notes'));
    let users = JSON.parse(localStorage.getItem('user'));
    if (users) {
      this.user = true;
      this.router.navigate(['/notes']);
    }
  }
  openModal(content, value?: any, noteId?: any) {
    this.noteForm = value || '';
    this.noteiD = noteId || null;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => { },
        (reason) => { }
      );
  }
  submitNotes() {
    debugger
    if (!this.noteForm) {
      return;
    } else {
      if (this.noteiD) {
        this.notesArr = this.notesArr;  
        let index = this.notesArr.findIndex((id) => id.id == this.noteiD);
        this.notesArr[index].notes = this.noteForm;
        localStorage.setItem('notes', JSON.stringify(this.notesArr));
        this.noteForm = '';
        this.modalService.dismissAll();
      } else {
        this.notes = new Notes();
        this.notesArr = this.notesArr;
        this.notes.id = Math.random().toString(36).slice(2);
        this.notes.notes = this.noteForm;
        this.notesArr.push(this.notes);
        localStorage.setItem('notes', JSON.stringify(this.notesArr));
        this.noteForm = '';
        this.modalService.dismissAll();
      }
    }
  }

  logout() {
    this.user = false;
    this.router.navigate(['/login']);
  }
  clearCache() {
    this.user = false;
    localStorage.clear();
    this.router.navigate(['/register']);
  }
}
