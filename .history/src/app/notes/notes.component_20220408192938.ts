import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Notes } from '../user.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  a = [1, 2, 3, 4, 5];
  notes: Notes;
  notesArr: Notes[] = [];
  noteForm: any;
  noteiD: any;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.notesArr = JSON.parse(localStorage.getItem('notes'));
  }
  openModal(content, value?: any, noteId?: any) {
    this.noteForm = value || '';
    this.noteiD = noteId || null;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  submitNotes() {
    debugger
    if (!this.noteForm) {
      return;
    } else {
      if (this.noteiD) {
        let index = this.notesArr.findIndex((id) => id.id == this.noteiD);
        this.notesArr[index].notes = this.noteForm;
        localStorage.setItem('notes', JSON.stringify(this.notesArr));
        this.noteForm = '';
        this.modalService.dismissAll();
      } else {
        this.notes = new Notes();
        this.notesArr=[]
        this.notes.id = Math.random().toString(36).slice(2);
        this.notes.notes = this.noteForm;
        this.notesArr.push(this.notes);
        localStorage.setItem('notes', JSON.stringify(this.notesArr));
        this.noteForm = '';
        this.modalService.dismissAll();
      }
    }
  }
}
