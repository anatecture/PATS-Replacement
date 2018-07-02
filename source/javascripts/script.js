var section = document.getElementById('Section');
var tabBar = document.getElementById('TabBar');
var tabs = [];

var patient = {
  id: '33314' + '71' + '1' + '4',
  firstName: 'Gary',
  lastName: 'Reynolds',
  sex: 'M',
  address: '762 Collins Creek Lane Palm Harbor FL 346844',
  dobM: '01',
  dobD: '25',
  dobY: '1971',
  interaction: 'C-512.20170001'
}

if(!proto) {
  var proto = 0;
}
if(proto === 1) {
  document.body.classList.add('ideal');
}

////////////////////////
// NOTIFICATIONS

var notifyNumber = document.getElementById('notifyNumber');
var priorityNumber = document.getElementById('priorityNumber');
var notification = document.getElementById('notification');

var notifyCount = 0;
var priorityCount = 0;
var nID = 0;
var notificationList = [];

var notify = function(n,first,last,num,pri) {
  notifyCount = notifyCount + 1;
  nID = nID + 1;
  var e = document.createElement('div');
  e.setAttribute('nid',nID);

  if(!pri) {
    pri = 0;
  }

  if(pri) {
    priorityCount = priorityCount + 1;
  }

  var dt = new Date();
  var m = dt.getMonth()+1;
  var d = dt.getDate();
  var y = dt.getFullYear();
  var h = 'pm';
  if((dt.getHours() % 12) === dt.getHours()) {
    var h = 'am';
  }
  var mi = dt.getMinutes().toString();
  if (mi.length === 1) {
    mi = '0' + mi;
  }
  var t = (dt.getHours() % 12) + ':' + mi + h;

  if(notifyCount === 1) {
    notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notification';
  } else {
    notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notifications';
  }
  priorityNumber.innerHTML = '<span>' + priorityCount + '</span> Priority';

  var eHref     = 'javascript:notifyClear('+nID+','+pri+');c(\'firstName\',\''+first+'\');c(\'lastName\',\''+last+'\');c(\'interaction\',\''+num+'\');readMark(this);load(\'Case\');';
  if(!first) {
    eHref       = 'javascript:notifyClear('+nID+','+pri+');load(\'Case\');readMark(this);'
  }
  var checkHref = 'javascript:javascript:archive('+nID+','+pri+');';

  e.innerHTML = '<a href="#" onclick="'+eHref+'"><div class="meta"><span class="priority-indicator">Priority</span><time> <span class="hour">'+t+'</span> <span class="date">'+m+'/'+d+'/'+y+'</span> </time></div><p>'+ n +'</p><a href="#" onclick="javascript:readToggle(this);" class="notifications-check"><svg version="1.1" x="0px" y="0px" viewBox="0 0 19 14"><polyline points="1,6 7,12 18,1"/></svg></a><a href="#" onclick="javascript:archive(this)" class="notifications-x"><svg version="1.1" x="0px" y="0px" viewBox="0 0 19 14"><line class="st0" x1="3" y1="13" x2="15" y2="1"/><line class="st0" x1="3" y1="1" x2="15" y2="13"/></svg></a>';
  e.classList.add('notifications-notification');
  e.classList.add('unread');
  if(pri) {
    e.classList.add('priority');
  }
  notificationList.push(e);

  if(priorityCount > 0) {
    notification.classList.add('priority');
  } else {
    notification.classList.remove('priority');
  }

  var elements = document.querySelectorAll('.notificationsList .notifications-list');

  for (var i = 0; i < elements.length; i++) {
    elements[i].insertBefore(e.cloneNode(true), elements[i].querySelector('*'));
  }
}

var readToggle = function(e) {
  e = e.parentElement;
  e.classList.toggle('unread');
  if(e.classList.value.includes('unread')) {
    notifyCount = notifyCount + 1;
    if(e.classList.value.includes('priority')) {
      priorityCount = priorityCount + 1;
    }
  } else {
    notifyCount = notifyCount - 1;
    if(e.classList.value.includes('priority')) {
      priorityCount = priorityCount - 1;
    }
  }

  if(notifyCount === 1) {
    notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notification';
  } else {
    notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notifications';
  }
  priorityNumber.innerHTML = '<span>' + priorityCount + '</span> Priority';
  if(priorityCount > 0) {
    notification.classList.add('priority');
  } else {
    notification.classList.remove('priority');
  }
}

var readMark = function(e) {
  e = e.parentElement;
  if(e.classList.value.includes('unread')) {
    notifyCount = notifyCount - 1;
    if(e.classList.value.includes('priority')) {
      priorityCount = priorityCount - 1;
    }
    if(notifyCount === 1) {
      notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notification';
    } else {
      notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notifications';
    }
    priorityNumber.innerHTML = '<span>' + priorityCount + '</span> Priority';
    if(priorityCount > 0) {
      notification.classList.add('priority');
    } else {
      notification.classList.remove('priority');
    }
  }

  e.classList.remove('unread');
}

var archive = function(e,pri) {
  e = e.parentElement;
  var archive = document.querySelector('.notificationsArchive .notifications-list');
  if(e.classList.value.includes('unread')) {
    notifyCount = notifyCount - 1;
    if(e.classList.value.includes('priority')) {
      priorityCount = priorityCount - 1;
    }
    if(notifyCount === 1) {
      notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notification';
    } else {
      notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notifications';
    }
    priorityNumber.innerHTML = '<span>' + priorityCount + '</span> Priority';
    if(priorityCount > 0) {
      notification.classList.add('priority');
    } else {
      notification.classList.remove('priority');
    }
  }
  e.classList.remove('unread');
  // archive.appendChild(e)
  archive.insertBefore(e, archive.querySelector('.notifications-notification'));
}

var readAll = function() {
  var c = document.querySelector('.notificationsList .notifications-list');
  var ns = c.querySelectorAll('.notifications-notification');
  for (var i = 0; i < ns.length; i++) {
    var n = ns[i];
    if(n.classList.value.includes('unread')) {
      notifyCount = notifyCount - 1;
      if(n.classList.value.includes('priority')) {
        priorityCount = priorityCount - 1;
      }
      if(notifyCount === 1) {
        notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notification';
      } else {
        notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notifications';
      }
      priorityNumber.innerHTML = '<span>' + priorityCount + '</span> Priority';
      if(priorityCount > 0) {
        notification.classList.add('priority');
      } else {
        notification.classList.remove('priority');
      }
    }

    n.classList.remove('unread');
  }
}

var archiveAll = function() {
  var c = document.querySelector('.notificationsList .notifications-list');
  var ns = c.querySelectorAll('.notifications-notification');
  var archive = document.querySelector('.notificationsArchive .notifications-list');
  for (var i = 0; i < ns.length; i++) {
    var n = ns[i];
    if(n.classList.value.includes('unread')) {
      notifyCount = notifyCount - 1;
      if(n.classList.value.includes('priority')) {
        priorityCount = priorityCount - 1;
      }
      if(notifyCount === 1) {
        notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notification';
      } else {
        notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notifications';
      }
      priorityNumber.innerHTML = '<span>' + priorityCount + '</span> Priority';
      if(priorityCount > 0) {
        notification.classList.add('priority');
      } else {
        notification.classList.remove('priority');
      }
    }

    n.classList.remove('unread');
    archive.insertBefore(n, archive.querySelector('.notifications-notification'));
  }
}

var archiveActive = false;
var toggleArchive = function() {
  var archive = document.getElementById('notificationsArchive');
  var list    = document.getElementById('notificationsList');
  if(archiveActive) {
    list.classList.add('active');
    archive.classList.remove('active');
    archiveActive = false;
  } else {
    list.classList.remove('active');
    archive.classList.add('active');
    archiveActive = true;
  }
}

var firstName = [
  'James',
  'John',
  'Robert',
  'Michael',
  'William',
  'David',
  'Richard',
  'Joseph',
  'Thomas',
  'Charles',
  'Christopher',
  'Daniel',
  'Matthew',
  'Anthony',
  'Donald',
  'Mark',
  'Paul',
  'Steven',
  'Andrew',
  'Kenneth',
  'George',
  'Joshua',
  'Kevin',
  'Brian',
  'Edward',
  'Ronald',
  'Timothy',
  'Jason',
  'Jeffrey',
  'Ryan',
  'Gary',
  'Jacob',
  'Nicholas',
  'Eric',
  'Mary',
  'Patricia',
  'Jennifer',
  'Elizabeth',
  'Linda',
  'Barbara',
  'Susan',
  'Jessica',
  'Margaret',
  'Sarah',
  'Karen',
  'Nancy',
  'Betty'];
var lastName = [
  'Smith',
  'Johnson',
  'Williams',
  'Jones',
  'Brown',
  'Davis',
  'Miller',
  'Wilson',
  'Moore',
  'Taylor',
  'Anderson',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
  'Thompson',
  'Garcia',
  'Martinez',
  'Robinson',
  'Clark',
  'Rodriguez',
  'Lewis',
  'Lee',
  'Walker',
  'Hall',
  'Allen',
  'Young',
  'Hernandez',
  'King',
  'Wright',
  'Lopez',
  'Hill',
  'Scott',
  'Green',
  'Adams',
  'Baker',
  'Gonzalez',
  'Nelson',
  'Carter',
  'Mitchell',
  'Perez',
  'Roberts',
  'Turner',
  'Phillips',
  'Campbell',
  'Parker',
  'Evans',
  'Edwards',
  'Collins',
  'Stewart',
  'Sanchez',
  'Morris',
  'Rogers',
  'Reed'];

var randomize = function(a) {
  // return a[Math.floor(Math.random()*a.length)];
  return a[Math.floor(Math.random()*a.length)];
}
var caseNum = function() {
  return 'C-512.2017' + Math.floor(Math.random()*10000);
}

var message = [
  'has been assigned to you',
  'has been rejected',
  'has been marked as resolved',
  'has been reassigned',
  'has not been modified in 48 hours'
];

var notificationTime  = 30; // in seconds
var notificationLimit = 1; // Number of times to auto notify
var notificationCount = notifyCount;

function autoNotify(pri) {
  var first = randomize(firstName);
  var last = randomize(lastName);
  var m = randomize(message);
  var num = caseNum();
  notify(num + ' ' + m,first,last,num,pri);
}
// autoNotify();

notify('C-512.20178291' + ' ' + 'has been assigned to you', 'Timothy', 'Clark', 'C-512.20178291');
// setInterval(function(){
//   if (notificationCount < notificationLimit) {
//     notify('C-512.20173821' + ' ' + 'has been marked as resolved', 'Jason', 'Phillips', 'C-512.20173821');
//     notificationCount = notificationCount + 1;
//   }
// }, notificationTime * 1000);

var notifyClear = function(n,pri) {
  if(notify) {
    if(notifyCount > 0) {
      notifyCount = notifyCount - 1;
    }
    if(priorityCount > 0) {
      priorityCount = priorityCount - 1;
    }

    // document.querySelectorAll('[nid="' + n + '"]').forEach(function(element) {
    //   element.classList.remove('unread');
    // });
    for (var i = 0; i < document.querySelectorAll('[nid="' + n + '"]').length; i++) {
      document.querySelectorAll('[nid="' + n + '"]')[i].classList.remove('unread');
    }

    if(notifyCount === 1) {
      notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notification';
    } else {
      notifyNumber.innerHTML = '<span>' + notifyCount + '</span> Notifications';
    }
    priorityNumber.innerHTML = '<span>' + priorityCount + '</span> Priority';

    if(priorityCount <= 0) {
      notification.classList.remove = 'priority';
    }
  }
}


////////////////////////
// Helper functions

var c = function(p,v) {
  patient[p] = v;

  var select = document.querySelectorAll('.data-' + p);
  for (var i = 0; i < select.length; i++) {
    select[i].innerHTML = v;
  }
}

var load = function(n) {
  section.classList.remove('loaded');
  var el = document.getElementById(n);
  var tab = el.dataset.tab;

  if (tab === 'name') {
    tab = patient.lastName + ', ' + patient.firstName;
  }
  if (tab === undefined) {
    section.classList.add('borderless');
    section.classList.remove('mywork');
  } else if (tab === 'My Work') {
    section.classList.add('borderless');
    section.classList.add('mywork');
    tabs.push(tab);
    writeTabs(tabs,tab);
  } else {
    section.classList.remove('borderless');
    section.classList.remove('mywork');
    tabs.push(tab);
    writeTabs(tabs,tab);
  }

  section.innerHTML = el.innerHTML;

  section.classList.add('loaded');
}

var writeTabs = function(t,a) {
  tabBar.innerHTML = '';
  for (var i = 0; i < t.length; i++) {
    var active = '';
    if (t.length === i+1) {
      active = 'active';
    }
    var html = '<div class="tabBar-tab ' + active + '"> <span class="tab-name">' + t[i] + '</span> <a class="close" href="javascript:closeTab(' + i + ');">✕</a> </div>'
    tabBar.innerHTML = tabBar.innerHTML + html;
  }
}

var closeTab = function(n) {
  tabs.splice(n);
  if (tabs.length > 0) {
    writeTabs(tabs,tabs.length);
  }
  else {
    writeTabs(tabs,0);
    section.innerHTML = '';
  }
}

var activate = function(target) {
  var t = target;
  if (typeof target === 'string') {
    t = document.getElementById(target);
  }
  t.classList.toggle('active');
}

// future dates
var futureDates = document.querySelectorAll('.futureDate');

var someDate = new Date();
var numberOfDaysToAdd = 2;
someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
var dd = someDate.getDate();
var mm = someDate.getMonth() + 1;
var y = someDate.getFullYear();

var someFormattedDate = mm + '/'+ dd + '/'+ y;

for (var i = 0; i < futureDates.length; i++) {
  var date = futureDates[i];
  date.innerHTML = someFormattedDate;
}
